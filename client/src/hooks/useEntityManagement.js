import { useMemo, useState } from "react";

import { message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

export const useEntityManagement = ({
  queryKey,
  service,
  createMessage,
  updateMessage,
  deleteMessage,
}) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [currentRecord, setCurrentRecord] = useState(null);

  const listQuery = useQuery({
    queryKey: [queryKey, { search, page, limit }],
    queryFn: () => service.list({ search, page, limit }),
    placeholderData: (previousData) => previousData,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  };

  const createMutation = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      message.success(createMessage);
      invalidate();
      setDrawerOpen(false);
    },
    onError: (error) => {
      message.error(extractErrorMessage(error));
    },
  });

  const updateMutation = useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      message.success(updateMessage);
      invalidate();
      setDrawerOpen(false);
    },
    onError: (error) => {
      message.error(extractErrorMessage(error));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: service.remove,
    onSuccess: () => {
      message.success(deleteMessage);
      invalidate();
    },
    onError: (error) => {
      message.error(extractErrorMessage(error));
    },
  });

  const pagination = listQuery.data?.meta || {
    page: 1,
    limit,
    total: 0,
  };

  const items = useMemo(() => listQuery.data?.data || [], [listQuery.data]);

  const openCreate = () => {
    setMode("create");
    setCurrentRecord(null);
    setDrawerOpen(true);
  };

  const openEdit = (record) => {
    setMode("edit");
    setCurrentRecord(record);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const updateSearch = (value) => {
    setPage(1);
    setSearch(value);
  };

  const submit = async (payload) => {
    if (mode === "create") {
      await createMutation.mutateAsync(payload);
      return;
    }

    await updateMutation.mutateAsync({
      id: currentRecord._id || currentRecord.id,
      payload,
    });
  };

  return {
    search,
    setSearch: updateSearch,
    page,
    setPage,
    limit,
    setLimit,
    items,
    pagination,
    drawerOpen,
    mode,
    currentRecord,
    listQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    openCreate,
    openEdit,
    closeDrawer,
    submit,
  };
};
