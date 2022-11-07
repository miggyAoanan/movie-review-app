import React, { useState, useEffect, useMemo } from 'react'
import ModalRWD from '../../../components/Modal/ModalRWD';
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Theme } from '@mui/material/styles';

import { Movie } from "../../../interfaces"
import { useAppDispatch, useAppSelector, RootState } from '../../../store/store'
import { getActors } from "../../../redux/actorSlice";

export type AddMovieFunction = (args: Movie) => Promise<void>;

interface AddMovieModalProps {
  onClose: () => void;
  isModalVisible: boolean;
  error?: string;
  onAddMovie: AddMovieFunction;

}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isModalVisible, onClose, error, onAddMovie }) => {

  const actors = useAppSelector((state: RootState) => state.actors.actors)
  const dispatch = useAppDispatch();

  const [actorArray, setActorArray] = React.useState<string[] | string>([]);


  useEffect(() => {
    if (actors) {
      dispatch(getActors())

    }
  }, [dispatch])

  const dataActors = useMemo(() => actors, [actors])


  const [input, setInput] = useState({
    title: "",
    year: "",
    cost: 0,
    imageURL: "",
    // actorIds: []

  });



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };



  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChangeActor = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    console.log(value);
    setActorArray(value)


  };
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  

  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>
          <p className='fs-5 text-white'>Please enter movie details</p>
             {error  && <p className='text-danger fs-6'>{error}</p>}

          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Movie Title</span>
            <input
              type="text"
              name='title'
              placeholder='Movie title'
              onChange={handleChange}
              value={input.title}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Year</span>
            <input
              type="text"
              placeholder='Year'
              name='year'
              onChange={handleChange}
              value={input.year}
              className="form-control form-control-sm"
            />
          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Cost</span>
            <input
              type="number"
              placeholder='Cost'
              name='cost'
              onChange={handleChange}
              value={input.cost}
              className="form-control form-control-sm"
            />
          </div>

          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Image URL</span>
            <input
              type="text"
              placeholder='image'
              name='imageURL'
              onChange={handleChange}
              value={input.imageURL}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Actors</span>
            <input type="hidden"
              placeholder='actors'
              name='actorIds'
              onChange={handleChange}
              value={actorArray}
              className="form-control form-control-sm"
            />

          </div>

          <>


            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChangeActor}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <>

                  
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} >
                      {selected.map((value) => (
                        <Chip key={value} label={value} className="text-white" />
                      ))}
                    </Box>
                  </>


                )}
                MenuProps={MenuProps}
              >
                {dataActors?.map((actor:any, index:any) => (
                  <MenuItem
                    key={index}
                    value={actor.id}
                   
                  // style={getStyles(name, personName, theme)}
                  >
                    {actor.firstName + " " + actor.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>



          </>
       

          <ButtonContainer>
            <button onClick={onClose}
              className="btn btn-light btn-sm px-5"
            >Cancel</button>
            <button onClick={() => onAddMovie({...input, actorIds: actorArray })}

              className="btn btn-primary btn-sm px-5"
            >Add</button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default AddMovieModal