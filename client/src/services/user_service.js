import { LOGIN_ROUTE, SIGN_UP_ROUTES } from "../constants/baseurl";

/**
 * @note -> The services only act as connections to the backend, and contact the backend,
 *          The rest task is to be handled by the react code only,
 *          for eg. setting localStorage.set('token', null)
 */

export function LoginUser ( email, pass ) {
    const options = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            username: email,
            password: pass
        })
    }

    return fetch( LOGIN_ROUTE , options ).then(response => {
        if( !response.ok )    throw Error({msg: response.statusText})

        return response.json();
    })
}

export function SignUpInd( name, password, email, contactNumber ) {
    // @todo - Guidance from @Rupali @pallavi required to complete the connection

    const options = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            email,
            password,
            name,
            contactNumber
        })
    }

    return fetch( SIGN_UP_ROUTES.ind , options ).then(response => {
        if( !response.ok )    throw Error({msg: response.statusText})

        return response;
    })
}

// export function SignUpOrg( username, password, email, mobile ) {
    // @todo

    // const options = {
    //     method: 'POST',
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json;charset=UTF-8"
    //     },
    //     body: JSON.stringify({
    //         username,
    //         password,
    //         email,
    //         mobile
    //     })
    // }

    // return fetch( SIGN_UP_ROUTE, options ).then(response => response.json());
// }
