import React from "react";
import DataTable from "../../components/DataTable/DataTable";
import ChatBotOverlay from "../../components/ChatBotOverlay/ChatBotOverlay";

const Table: React.FC = () => {
    return(
        <div style={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center'}}>
            <h1> Table Page </h1>
            <DataTable />
            <ChatBotOverlay />
        </div>
    )
}

export default Table;