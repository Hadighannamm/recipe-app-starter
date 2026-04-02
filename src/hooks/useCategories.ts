import { useEffect,useState } from "react";
import type { Category } from "../types/category";
import { getCategories } from "../services/categoryService";
export function useCategories(){

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadCategories(){
        setLoading(true)
        setError("")
        const {data, error} = await getCategories();
        console.log("Categories data: ", data)
        console.log("ERROROROROROR:   ",error)
        if(error){
            setError(error.message)
            setLoading(false)
            return;
        }

        setCategories(data ?? [])

        setLoading(false)
    }


    useEffect(()=>{
        loadCategories()
    },[])


    return{
        categories, loading, error
    }
}