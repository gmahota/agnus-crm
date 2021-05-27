import { ErrorRequestHandler } from 'express';
import {ValidationError } from 'yup'

interface ValidationErrors{
    [key:string]:string[];
}

const errorHandler: ErrorRequestHandler =(error,request,response,next) => {
    
    if(error instanceof ValidationError){
        let errors:ValidationErrors ={};

        error.inner.forEach(err=>{
            const path = err.path || ""
            if(path.length > 0){
                errors[path]= err.errors;
            }
        });

        return response.status(400).json({message:"Validation Errors",errors});
    }
    
    console.error(error);

    return response.status(500).json({message:'Internal server error'})
}

export default errorHandler;