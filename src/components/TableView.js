

export default function TableView(props) {
    console.log(props)
    const dataList = props.data
    if (dataList === undefined) {
        return <div></div>
    }
    const headerList = Object.keys(props.data[0])
    const firstRow = dataList[0]
    Object.values(firstRow).map(value => {
        console.log(value)
    })
    var bad_key = 0;
    return (
        <div>
            Table
            <table>
                <thead>
                    <tr>
                        {headerList.map(header => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {dataList.map(row => {
                        return (
                            <tr key={row.id}>
                                {Object.values(row).map(value => <td key={bad_key++}>{value}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

