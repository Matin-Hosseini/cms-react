export const columns = [
  { field: "title", headerName: "عنوان", width: 80, editable: true },
  { field: "text", headerName: "متن پیام", width: 500, editable: true },
  {
    field: "description",
    headerName: "توضیحات",
    width: 300,
    editable: true,
  },
  // {
  //   field: "actions",
  //   headerName: "عملیات",
  //   width: 100,
  //   renderCell: (params) => {
  //     const { id } = params.row;
  //     const { showSnackbar } = useSnackbar();

  //     const handleDelete = async () => {
  //       try {
  //         await deleteSmsCategory(id); // ارسال درخواست حذف به سرور
  //         showSnackbar("دسته‌بندی پیامک با موفقیت حذف شد.", "success");
  //       } catch (error) {
  //         showSnackbar("خطایی رخ داد. لطفاً دوباره تلاش کنید.", "error");
  //       }
  //     };

  //     return (
  //       <IconButton onClick={handleDelete} color="error">
  //         <DeleteIcon />
  //       </IconButton>
  //     );
  //   },
  // },
];
