import axios from 'axios'
import {Table} from '../components/table'
import { useEffect, useState } from 'react';
import { DatasetDetails } from "../interface/interface";

export  function DatasetRefreshDashboard(){
    const [data,setData] = useState<DatasetDetails[]>([]);
    useEffect(() =>{
        (async () =>{
            const res = await getRefreshStatusData();
            setData(res);
        })()
    },[])
    const header = ['Dataset Name','Refresh Status','Refresh Start Time','Last Refresh','Refresh Frequency','Last Refresh Duration']
    return (
        <div>
            <Table tableHeader={header} tableRows={data}></Table>
        </div>
    )
}

async function getRefreshStatusData(){
    try{
        const {data,status} = await axios.get('http://localhost:3000/api/v1/project/refreshStatus?groupId=b8e0368d-51ec-423d-b314-b9ccc6486f03');
        console.log(status);
        return data;
    }catch(error){
        console.log(error);
        return new Error("something went wrong");
    }
}