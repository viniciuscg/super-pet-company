import './Profile.css'
import { useState } from "react";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Add } from '@mui/icons-material';
import { PiDog } from 'react-icons/pi'
import { MdOutlinePets } from 'react-icons/md';
import { GiWeightScale } from 'react-icons/gi';
import { LiaDogSolid } from 'react-icons/lia';
import { useEffect } from 'react'
import Autocomplete from '@mui/joy/Autocomplete';
import DogCard from '../../Components/DogCard/DogCard';
import { UserServices } from '../../services/user/userServices';
import { IGetPets, PetServices } from '../../services/pet/petServices';
import { BreedService } from '../../services/breed/breedService';
import { Breed } from '../../services/breed/breedModel';

export const sizes = [
  "Small",
  "Medium",
  "Large",
] 

function Profile() {

  const [errorPetRegister, setErrorPetRegister] = useState('');  
  const [userName, setUserName] = useState('')
  const [pets, setPets] = useState<IGetPets[]>([])
  const [petName, setPetName] = useState('')
  const [petWeight, setPetWeight] = useState<number>()
  const [petSize, setPetSize] = useState('')
  const [breed, setBreed] = useState<Breed>()
  const [petBreeds, setPetBreeds] = useState<Breed[]>([])
  
  const registerPet = async () => {
    if (!petName || !petWeight || !petSize || !breed) 
      return setErrorPetRegister("pet invalido")
    try {
      const userId = localStorage.getItem("id")
      await PetServices.RegisterPet({user_id: Number(userId), name: petName, weight: petWeight, size: petSize, breed_id: breed?.id})
      getPets()
    } catch (error: any) {
      setErrorPetRegister(error.message)
    }
  }

  const userStats = async () => {
    const id = localStorage.getItem("id")
    const response = await UserServices.userStats(Number(id))
    setUserName(response.name)
  }

  const getPets = async () => {
    const userId = localStorage.getItem("id")
    const response = await PetServices.getPets(Number(userId))
    setPets(response)
  }

  const getBreeds = async () => {
    const response = await BreedService.getBreeds()
    setPetBreeds(response)
  }

  useEffect(() => {
    getPets()
    userStats()
    getBreeds()
  },[])

  return (
    <div className="container-profile">

        <div className="header-profile">
          <h1>{userName}</h1>
        </div>
        <p>{errorPetRegister}</p>
        <div className="add-newdog">
            <Input 
              placeholder="name"
              startDecorator={<MdOutlinePets style={{ color: "#c7ecf4" }} />}
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
              value={petName}
              onChange={e => setPetName(e.target.value)}
              />
            <Input 
              type='number'
              placeholder="weight"
              startDecorator={<GiWeightScale style={{ color: "#c7ecf4" }} />}
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
              value={petWeight}
              onChange={e => setPetWeight(Number(e.target.value))}
            />
            <Autocomplete
              placeholder="breed"
              startDecorator={<PiDog style={{ color: "#c7ecf4" }} />}
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
              options={petBreeds}
              value={breed}
              onChange={(e, value) => setBreed(value!)}
              getOptionLabel={option => option.name}
            />
            <Autocomplete
              placeholder="Size"
              startDecorator={<LiaDogSolid style={{ color: "#c7ecf4" }} />}
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
              options={sizes}
              value={petSize}
              onChange={(e, value) => setPetSize(value!)}
            />
        </div>

        <Button onClick={registerPet} startDecorator={<Add />} style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}>
          Add new dog
        </Button>

        <div className="dogs-cards-body">
          {pets.map(pet => (
            <DogCard pet={pet} />
          ))}
        </div>

    </div>
  )
}

export default Profile


