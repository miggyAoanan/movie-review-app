import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import ModalRWD from '../../../components/Modal/ModalRWD';
import { ButtonContainer } from '../../../components/Modal/ModalPopup.styled'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Movie, ActorDetails } from "../../../interfaces"
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

  const actors : ActorDetails[] | null = useAppSelector((state: RootState) => state.actors.actors)
  const dispatch = useAppDispatch();
  const [actorArray, setActorArray] = React.useState<string[] | string>([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (actors) {
      dispatch(getActors())

    }
  }, [dispatch])

  const dataActors = useMemo(() => actors, [actors])

  const [input, setInput] = useState({
    title: "",
    overview: "",
    yearReleased: 2022,
    cost: 0,
    imageURL: "",

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
    setActorArray(value)

  };

  const getActorName = (id: string) => {
    let tempActor = dataActors?.find((actor) => actor.id === id.toString());
    return `${tempActor?.firstName} ${tempActor?.lastName}`;
  };

  const linktoActor = () => {
    navigate("/admin/actor/dash")
  }


  return (
    <ModalRWD
      onBackdropClick={onClose}
      isModalVisible={isModalVisible}
      content={
        <>
          <p className='fs-5 text-white'>Please enter movie details</p>
          {error && <p className='text-danger fs-6'>{error}</p>}

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
            <span className='fs-6 text-white'>Movie Overview</span>
            <input
              type="text"
              name='overview'
              placeholder='Movie Overview'
              onChange={handleChange}
              value={input.overview}
              className="form-control form-control-sm"
            />

          </div>
          <div className='form-outline form-white'>
            <span className='fs-6 text-white'>Year</span>
            <input
              type="number"
              placeholder='Year'
              name='yearReleased'
              onChange={handleChange}
              value={input.yearReleased}
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


          <>
            {dataActors !== undefined ? (

              <FormControl sx={{ m: 1, width: 300 }}  >
                <span className='fs-6 text-white'>Select Actors</span>
                <InputLabel id="demo-multiple-chip-label"></InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChangeActor}
                  input={<OutlinedInput id="select-multiple-chip" label="Select Multiple" />}
                  renderValue={(selected) => (
                    <>


                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}  >
                        {selected.map((value) => (
                          <Chip key={value} label={getActorName(value)} className="text-dark bg-light" />
                        ))}
                      </Box>
                    </>


                  )}
                  MenuProps={MenuProps}
                >
                  {dataActors?.map((actor: any, index: any) => (
                    <MenuItem
                      key={index}
                      value={actor.id}

                    >
                      {actor.firstName + " " + actor.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>



            ) : (<div>

              <button
                type="button"
                className="btn btn-primary btn-sm px-5"
                onClick={() => { linktoActor() }}
              >Add</button>

            </div>)}

          </>

          <ButtonContainer>
            <button onClick={onClose}
              className="btn btn-light btn-sm px-5"
            >Cancel</button>
            <button onClick={() => onAddMovie({ ...input, actorIds: actorArray })}

              className="btn btn-primary btn-sm px-5"
            >Add</button>
          </ButtonContainer>

        </>
      }
    />
  )
}

export default AddMovieModal