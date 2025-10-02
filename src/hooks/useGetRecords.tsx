import { useEffect, useState } from "react";
import getRecords from "../api/getRecords";
import delRecord from "../api/delRecord";

type RecordType = { _id: number; [key: string]: any };

export default function useGetRecords() {
    const [records, setRecords] = useState<RecordType[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getRecords()
                setRecords(data.data.payload)
            } catch(e) {
                console.log(`Error fetching records: ${e}`)
            }
        }
        fetchData()
    })

    const sendRecordID = async (_id: number) => {
        try {
            await delRecord(_id)
            setRecords(records.filter((records) => records._id !== _id))
        } catch(e) {
            console.log(`Error deleting record of _id=${_id}, ${e}`)
        }
    }

    return{
        records,
        sendRecordID
    }
}