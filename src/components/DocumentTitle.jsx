import React, { useEffect, useState } from "react";

const useDocumentTitle = ({title}) => {
  const document_titles = 'Trang chủ';
   useEffect(() => {
    document.title = title; 
  },[document_titles]);
};

export default useDocumentTitle;