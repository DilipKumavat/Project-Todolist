export const Api = (history, formValue, path, onerror) => {
  fetch(`http://localhost:9999/${path}`, {
    method: "POST",
    body: JSON.stringify(formValue),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  })
    .then(async (res) => {
      if (res.status > 205) {
        
        const msg = await res.json();
        onerror(msg);
        throw new Error(msg);
      } else {
        return res.json();
      }
    })
    .then((response) => {
      history.push({
        pathname: "/todolist",
        state: response,
      });
    })
    .catch((err) => {
      
    });
};

export const logout = (history) => {
  fetch(`http://localhost:9999/logout`, {
    method: "GET",
    credentials: "include",
  })
    .then(() => {
      history.push({
        pathname: "/login",
      });
    })
    .catch((err) => {
      history.push({
        pathname: "/login",
        state: err,
      });
    });
};
