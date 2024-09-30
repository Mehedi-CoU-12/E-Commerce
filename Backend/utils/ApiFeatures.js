class ApiFeature{
    constructor(query,queryString)
    {
        this.query=query;
        this.queryString=queryString;
    }

    search(){

        const keyword=this.queryString.keyword?{
            name:{
                $regex:this.queryString.keyword,
                $options:"i"
            },
        }:{};

        this.query=this.query.find({ ...keyword });

        return this;
    }

    filter(){
        const queryCopy={ ...this.query };
        const removeFields=["keyword","limit","page"];

        removeFields.forEach(element => delete queryCopy[element]);

        console.log(queryCopy);
    }
}

export {ApiFeature}