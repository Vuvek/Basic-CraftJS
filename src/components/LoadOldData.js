import { useEditor } from '@craftjs/core';
import React, { useEffect } from 'react'

const LoadOldData = () => {

    const initialData = localStorage.getItem("pageData"); // Fetch saved JSON from storage

  const { actions } = useEditor();

  useEffect(() => {
    if (initialData) {
      actions.deserialize(initialData); // Load saved data into the editor
    }
  }, [initialData, actions]);

  return;
}

export default LoadOldData
