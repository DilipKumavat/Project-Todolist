export const addTodo = async (todo,priority,onsuccess) => {
  
  await fetch("http://localhost:9999/todo", {
    method: "POST",
    body: JSON.stringify({ task: todo,priority }),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
       onsuccess();
    }
  });
};

export const deleteTodo = async (idtoDelete, onsuccess) => {
  

   await fetch(`http://localhost:9999/todo/${idtoDelete}`, {
    method: "DELETE",
    credentials: "include",
  }).then((r) => {
    onsuccess();
  });
};

export const editTodo = (value,priority, idToEdit, onsuccess) => {
  

  fetch(`http://localhost:9999/todo/${idToEdit}`, {
    method: "PUT",
    body: JSON.stringify({ task: value }),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  })
    .then((r) => {
        if(r.ok){
            onsuccess();
        }
    })
    
};

export const fetchTodo = async () => {
  const alltodos = await fetch("http://localhost:9999/todo", {
    credentials: "include",
  })
    .then((r) => r.json())
    .then((arr) => {
      const sortedArray = arr.sort((a, b) => {
        const aDateNumeric = new Date(a.creationTime).valueOf();
        const bDateNumeric = new Date(b.creationTime).valueOf();
        return aDateNumeric - bDateNumeric;
      });
      
      return sortedArray;
    });

  return alltodos;
};
