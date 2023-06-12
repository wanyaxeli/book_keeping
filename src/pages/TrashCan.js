import React from "react";
const TrashCan=()=>{
    return(
        <div className="canWrapper">
            <table>
                <thead>
                    <tr>
                        <th>medicine</th>
                        <th>expiry</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>clozole b</td>
                        <td>25/04/2020</td>
                        <td><button>Remove</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default TrashCan