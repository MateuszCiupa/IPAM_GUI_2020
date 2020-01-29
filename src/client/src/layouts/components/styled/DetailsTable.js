import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

export default styled(Table)`
    th, td {
        text-align: left;
        padding: 10px;
        padding-right: 10px;
        padding-left: 20px;
        flex: 1;
    }

    th {
        text-align: center;
        padding-right: 20px;
        padding-left: 10px;
    }

    td.left {
        font-weight: bold;
        text-align: right;
    }

    td {
        
    }

    thead th {
        background-color: #20302a;
        color: white;
    }

    tr {
        display: flex;
        align-items: stretch;
        align-content: stretch;
        max-width: 600px;

    }  
`;