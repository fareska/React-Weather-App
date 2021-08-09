import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',  
        // borderRadius: '50px',
        backgroundColor: '#F79238',
       
    },
}));

export default function SearchInput(props) {
    const classes = useStyles();

    const [inputVal, setInputVal] = useState('')

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    }

    const isValidInput = () => {
        return inputVal.length > 0 ? true : false ;
    }
    
    const handleButtonClick = () => {
        if(isValidInput()){
            props.handleSearchClick(inputVal) ;
        } 
        setInputVal('');
    }

    return (
        <div className={classes.root}>
            <div id="inputDiv" >
                <TextField
                    id="standard-full-width"
                    label="Label"
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleInputChange}
                    value={inputVal}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon></Icon>}
                    onClick = {handleButtonClick}
                >
                    Search City
                    <span style={{margin:'0px 10px'}} > <SearchIcon/>   </span>
                </Button>

            </div>
        </div>
    );
}
