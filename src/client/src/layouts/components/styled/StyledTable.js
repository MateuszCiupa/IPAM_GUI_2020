import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

export default styled(Table)`
    th, td {
        text-align: center;
        padding: 10px;
    }

    thead th:nth-child(1) {
        width: 6%;
        text-align: left;
    }

    thead th:nth-child(${props => props.headers + 2}) {
        width: 6%;
        text-align: right;
    }

    thead th {
        background-color: #20232a;
        color: white;
    }

    tbody tr:hover {
        opacity: ${({ linkHover }) => linkHover ? '1' : '0.65'};
        cursor: pointer;

    }
`;