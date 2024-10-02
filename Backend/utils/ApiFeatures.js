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
        const queryCopy={ ...this.queryString };

        //remove some fields for category
        const removeFields=["keyword","limit","page"];

        removeFields.forEach(element => delete queryCopy[element]);
        

        //filter for Price and Ratings
        let queryStr=JSON.stringify(queryCopy);
        
        //this is reqular expression to convert gt->$gt for mongodb query purpose
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        let queryStringWithPrice=JSON.parse(queryStr);

        this.query=this.query.find(queryStringWithPrice);

        return this;
    }

    pagination(resultPerPage){

        const currentPage=Number(this.queryString.page) || 1;
        const skip=resultPerPage*(currentPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

export {ApiFeature}