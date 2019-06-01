import React from 'react';
import { firebasePositions } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const style ={
    cell:{
        padding: '4px 16px 4px 11px',
        borderBottom: '1px solid #ffffff',
        color: '#ffffff',
        textAlign: 'center',
        background: '#E31B23'
    },
    highlightedCell: {
        padding: '4px 16px 4px 11px',
        borderBottom: '1px solid #ffffff',
        color: '#ffffff',
        textAlign: 'center',
        background: '#9F1318'
    }
}


class LeagueTable extends React.Component {

    state = {
        positions:[]
    }

    componentDidMount(){
        firebasePositions
        .once('value')
        .then((snapshot) => {
            const positions = firebaseLooper(snapshot);

            this.setState({
                positions: positions
            });
        });
    }

    renderStyle(team) {
        if(team === 'Liverpool') {
            return style.highlightedCell;
        }
        return style.cell;
    }

    showTeamPositions = (positions) => (
        positions ?
            positions.map((position,i)=> {
                let style = this.renderStyle(position.team);
                return (
                    <TableRow key={i}>
                        <TableCell style={style}>{i+1}</TableCell>
                        <TableCell style={style}>{position.team}</TableCell>
                        <TableCell numeric style={style}>{position.w}</TableCell>
                        <TableCell numeric style={style}>{position.d}</TableCell>
                        <TableCell numeric style={style}>{position.l}</TableCell>
                        <TableCell numeric style={style}>{position.pts}</TableCell>
                    </TableRow>
                );
            })
            :null
    )

    
   

    render() {
        
        return (
            <div className="league_table_wrapper">
                <div className="title">
                    League Table
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={style.highlightedCell}>Pos</TableCell>
                            <TableCell style={style.highlightedCell}>Team</TableCell>
                            <TableCell style={style.highlightedCell}>W</TableCell>
                            <TableCell style={style.highlightedCell}>L</TableCell>
                            <TableCell style={style.highlightedCell}>D</TableCell>
                            <TableCell style={style.highlightedCell}>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.showTeamPositions(this.state.positions)}
                    </TableBody>
                </Table>
            </div>
        )
    }
};


export default LeagueTable;