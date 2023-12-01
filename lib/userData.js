import { getToken } from "./authenticate";



export async function addToFavourites(id){
    let token= getToken()
    const res= await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `JWT ${token}`,
                'content-type': 'application/json'
            },
        }
    )
    if (res.status==200){
        return res.json()
    }else{
        return []
    }

}

export async function removeFromFavourites(id){
    let token= getToken()
    const res= await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`,
                'content-type': 'application/json'
            },
        }
    )
    if (res.status==200){
        return res.json()
    }else{
        return []
    }
}

export async function getFavourites(){
    let token= getToken()
    const res= await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favourites`,
        {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
                'content-type': 'application/json'
            },
        }
    )
    if (res.status==200){
        return res.json()
    }else{
        return []
    }

}

export async function addToHistory(id){
    let token= getToken()
    const res= await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `JWT ${token}`,
                'content-type': 'application/json'
            },
        }
    )
    if (res.status==200){
        return res.json()
    }else{
        return []
    }
}

export async function removeFromHistory(id){
    let token= getToken()
    const res= await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`,
                'content-type': 'application/json'
            },
        }
    )
    if (res.status==200){
        return res.json()
    }else{
        return []
    }
}

export async function getHistory(){
    let token= getToken()
    const res= await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history`,
        {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`,
                'content-type': 'application/json'
            },
        }
    )
    if (res.status==200){
        return res.json()
    }else{
        return []
    }
}
