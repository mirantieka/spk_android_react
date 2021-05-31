import axios from 'axios';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTkyZjk5NzAtMTAwYS00MDNlLThhMWEtMzUwZGI3ZWM3ZWQ5IiwiaWF0IjoxNjAxNjQzNjk3fQ.q5zkKVBtaioe4wbaP_87I6gRUCFIOpIsjO23CUa4F_s'
const domain = '192.168.1.25:8000';
const baseUrl = 'http://'+domain+'/api/';
export const get = async (url, query = "", options = {}) => {
    if (!url) {
        return {
            isSuccess: false,
            message: 'url cant be empty'
        }
    }

    const headers = {
    }
    console.log(baseUrl+url);
    let res = await axios.get(baseUrl + url + query, {
        headers,
        ...options
    }).then(res => {
        // console.log("http :: get :: res", res);
        return res.data;
    }).catch(err => {
        console.log("http :: get :: err", err);
        throw err;
    });

    return res;
}

export const post = async (url, body, options = {}) => {
    if (!url) {
        return {
            isSuccess: false,
            message: 'url cant be empty'
        }
    }

    const headers = {
    }

    let res = await axios.post(baseUrl+url, body, {
        headers,
        ...options
    }).then(res => {
        // console.log("http :: post :: res", res);
        return res;
    }).catch(err => {
        console.log("http :: post :: err", err);
        throw err;
    });

    return res.data;
}

export const put = async (url, body, options = {}) => {
    if (!url) {
        return {
            isSuccess: false,
            message: 'url cant be empty'
        }
    }

    const headers = {
    }

    let res = await axios.put(baseUrl+url, body, {
        headers,
        ...options
    }).then(res => {
        // console.log("http :: put :: res", res);
        return res;
    }).catch(err => {
        console.log("http :: put :: err", err);
        throw err;
    });

    return res.data;
}


export const del = async (url, options = {}) => {
    if (!url) {
        return {
            isSuccess: false,
            message: 'url cant be empty'
        }
    }

    const headers = {
    }

    let res = await axios.delete(baseUrl+url, {
        headers,
        ...options
    }).then(res => {
        // console.log("http :: del :: res", res);
        return res;
    }).catch(err => {
        console.log("http :: del :: err", err);
        throw err;
    });

    return res.data;
}