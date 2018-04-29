const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

//checklogin
export const check = () =>
    fetch(`${api}/ad/check`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//checklogin
export const getSearchedMoviesAdmin = (term) =>
    fetch(`${api}/admin/movieSearch?term=${term}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//adminSignin
export const adminSignin = (values) =>
    fetch(`${api}/user/adminSignin`,  {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

//adminSignin
export const getMovieOverview = (tmdbid) =>
    fetch(`${api}/movies/getMovieOverview?tmdbid=${tmdbid}`,  {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(values)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//adminSignin
export const updateEditedMovieAdmin = (values) =>
    fetch(`${api}/admin/saveMovie`,  {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//adminSignin
export const searchUsers = (values) =>

    fetch(`${api}/user/searchusers?user=${values}`,  {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        //console.log(res.json());
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


//getBills
export const getBills = (value) =>

    fetch(`${api}/admin/bills?date=${value}`,  {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        //console.log(res.json());
        // console.log(res.json())
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


//getBillsMonth
export const getBillsMonth = (value) =>

    fetch(`${api}/admin/billMonth?date=${value}`,  {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then(res => {
        //console.log(res.json());
        // console.log(res.json())
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });