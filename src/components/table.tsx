import { DatasetDetails } from "../interface/interface";
import axios from "axios";

interface TableRowsProps{
    rowData : DatasetDetails
}

interface TableHeaderProps {
    heading: string[]
}

interface TableProps{
    tableHeader: string[],
    tableRows: DatasetDetails[],
}

const TableRows: React.FC<TableRowsProps> = ({rowData}) => {
    return (
        <tr className="odd:bg-white even:bg-gray-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {rowData.dataset_name}
                            <a href={rowData.dataset_url} > (Link) </a>
                        </th>
                        <td className="px-6 py-4">
                            {rowData.refresh_status}
                            <button className="p-0.5" onClick={()=>{
                                (async ()=>{
                                    await triggerRefersh(rowData.dataset_id)
                                })();
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                                    <path fill="black" d="M497.408 898.56c-.08-.193-.272-.323-.385-.483l-91.92-143.664c-6.528-10.72-20.688-14.527-31.728-8.512l-8.193 5.04c-11.007 6-10.767 21.537-4.255 32.256l58.927 91.409c-5.024-1.104-10.096-2-15.056-3.296c-103.184-26.993-190.495-96.832-239.535-191.6c-46.336-89.52-55.04-191.695-24.512-287.743c30.512-96.048 99.775-174.464 189.295-220.784c15.248-7.888 21.2-26.64 13.312-41.856c-7.872-15.264-26.64-21.231-41.855-13.327c-104.272 53.952-184.4 145.28-219.969 257.152C45.982 485.008 56.11 604.033 110.078 708.29c57.136 110.336 158.832 191.664 279.024 223.136c1.36.352 2.784.56 4.16.911l-81.311 41.233c-11.008 6.032-14.657 19.631-8.128 30.351l3.152 8.176c6.56 10.72 17.84 14.527 28.815 8.512L484.622 944.4c.193-.128.385-.096.578-.224l9.984-5.456c5.52-3.024 9.168-7.969 10.624-13.505c1.52-5.52.815-11.663-2.448-16.991zm416.496-577.747c-57.056-110.304-155.586-191.63-275.762-223.118c-8.56-2.24-17.311-3.984-26.048-5.712l79.824-40.48c11.008-6.033 17.568-19.632 11.04-30.369l-3.153-8.16c-6.56-10.736-20.752-14.528-31.727-8.528L519.262 80.654c-.176.112-.384.08-.577.208l-9.967 5.472c-5.537 3.04-9.168 7.967-10.624 13.503c-1.52 5.52-.816 11.648 2.464 16.976l5.92 9.712c.096.192.272.305.384.497l91.92 143.648c6.512 10.736 20.688 14.528 31.712 8.513l7.216-5.025c11.008-6 11.727-21.536 5.231-32.24l-59.2-91.856c13.008 2 25.968 4.416 38.624 7.76c103.232 27.04 187.393 96.864 236.4 191.568c46.32 89.519 55.024 191.695 24.48 287.728c-30.511 96.047-96.655 174.448-186.174 220.816c-15.233 7.887-21.168 26.607-13.28 41.87c5.519 10.64 16.335 16.768 27.599 16.768c4.8 0 9.664-1.12 14.272-3.488c104.272-53.936 181.248-145.279 216.816-257.119c35.536-111.904 25.393-230.929-28.574-335.152" />
                                </svg>
                            </button>
                        </td>
                        <td className="px-6 py-4">
                            {rowData.refresh_start_time}
                        </td>
                        <td className="px-6 py-4">
                            {rowData.last_refresh}
                        </td>
                        <td className="px-6 py-4">
                            {rowData.refresh_frequency}
                        </td>
                        <td className="px-6 py-4">
                            {rowData.last_refresh_duaration}
                        </td>
                    </tr>
    )
}

const TableHeader: React.FC<TableHeaderProps> = ({ heading }) =>{
    return (
        
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                       { heading.map((name:string,index:number) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
    )
}



const Table: React.FC<TableProps> = ({tableHeader,tableRows}) =>{
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <TableHeader heading={tableHeader}/>
                <tbody>
                    {tableRows.map((row,index)=>(
                        <TableRows key={index} rowData={row}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export{
    Table
}

async function triggerRefersh(datasetId:string){
    const {status} = await axios.post(`http://localhost:3000/api/v1/dataset/refresh`,{
        datasetId: datasetId
    });
    // let status = 200;
    console.log(datasetId);
    return status;
}