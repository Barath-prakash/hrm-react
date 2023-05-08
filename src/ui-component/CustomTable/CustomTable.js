import React from 'react';

const CustomTable = ({ tableDataList = [], bodyKeys = [], headings = [] }) => {
    // tableDataList => [{}, {}]
    // bodyKeys => ['', '']
    // headings => ['', '']
    return (
        <table>
            <thead>
                <tr>
                    {headings.map((el) => (
                        <td>{el}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableDataList?.map((tableObj, i) => (
                    <tr key={i}>
                        {bodyKeys.map((objKey) => {
                            return <td>{tableObj?.[objKey]}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

{
    /* <td>{el.departmentId}</td> */
}
{
    /* <td>{el.departmentName}</td> */
}

export default CustomTable;
