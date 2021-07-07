export const Api = (history, formValue, path,onerror) => {
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
        console.log(msg,"before throw");
        throw new Error(msg);
      }
      return await res.json();
    })
    .then((response) => {
      console.log(response);
      history.push({
        pathname: "/todolist",
        state: response,
      });
    })
    .catch((err) =>{ console.log({...err},"after throw"); });
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



