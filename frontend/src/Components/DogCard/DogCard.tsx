import './DogCard.css'
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { LiaDogSolid } from 'react-icons/lia';
import { Autocomplete, Button, Input } from '@mui/joy';
import { useState, useEffect } from 'react';
import { sizes } from '../../Pages/Profile/Profile';
import { BreedService } from '../../services/breed/breedService';
import { PiDog } from 'react-icons/pi';
import { Breed } from '../../services/breed/breedModel';
import { PetServices } from '../../services/pet/petServices';

interface IProps {
  pet: {
    id: number,
    name: string,
    size: string,
    weight: number,
    breed_id: number
    breed: {
      id: number,
      name: string,
    }
  }
}

function DogCard({ pet }: IProps) {

  const [editPet, setEditPet] = useState(false)
  const [newPetName, setNewPetName] = useState(pet.name)
  const [newPetWeight, setNewPetWeight] = useState(pet.weight)
  const [newPetSize, setNewPetSize] = useState(pet.size)
  const [newPetBreed, setNewPetBreed] = useState<Breed>(pet.breed)
  const [petBreeds, setPetBreeds] = useState<Breed[]>([])
  const [errorPetEdit, setErrorPetEdit] = useState('');  

  function editPets() {
    setEditPet(true)
  }

  const saveEdit = async () => {
    if(newPetName == pet.name && newPetWeight == pet.weight && newPetSize == pet.size && newPetBreed== pet.breed )
      setEditPet(false)

    try {
      const id = pet.id
      await PetServices.editPet(id, {name: newPetName, weight: newPetWeight, size: newPetSize, breed_id: newPetBreed.id})
      pet.name = newPetName
      pet.weight = newPetWeight
      pet.size = newPetSize
      pet.breed = newPetBreed
      setEditPet(false)
    } catch (error: any) {
      setErrorPetEdit(error.message)
    }
    
  }

  function size(size: string) {
    switch (size) {
      case "Small": return "50px"
      case "Medium": return "100px"
      case "Large": return "150px"
    }
  }

  const getBreeds = async () => {
    const response = await BreedService.getBreeds()
    setPetBreeds(response)
  }

  useEffect(() => {
    getBreeds()
  },[])

  return (
    <div>
      {!editPet ?
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            width: 320,
            gap: 2,
            backgroundColor: "#2682D7",
            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
          }}
        >
          <CardOverflow className="card-dog-icon" >
            <AspectRatio ratio="1" sx={{ width: size(pet.size)}}>
              <LiaDogSolid style={{ color: "#c7ecf4", backgroundColor: "#2682D7"   }} />
            </AspectRatio>
          </CardOverflow>
          <CardContent sx={{ px: 2 }}>
            <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
              {pet.name}, {pet.weight} kg
            </Typography>
            <Typography 
              fontSize="sm"
              aria-describedby="card-description"
              mb={1}
              sx={{ color: '#c7ecf4' }}
            >
              {pet.breed.name}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="sm"
              onClick={editPets} 
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4" }}
            >
              Edit
            </Button>
          </CardContent>
        </Card>
      :
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            width: 320,
            gap: 2,
            backgroundColor: "#2682D7",
            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
          }}
        >
          <CardOverflow className="card-dog-icon">
            <AspectRatio ratio="1" sx={{ width: size(pet.size)  }}>
              <LiaDogSolid style={{ color: "#c7ecf4", backgroundColor: "#2682D7" }} />
            </AspectRatio>
          </CardOverflow>
          <CardContent sx={{ px: 2, gap: "10px" }}>
            <Input 
              size='sm'
              style={{ color: "#c7ecf4", backgroundColor: "#2682D7", maxWidth: "150px" }}
              placeholder='name'
              value={newPetName}
              onChange={e => setNewPetName(e.target.value)}
            />
            <Input 
              size='sm'
              style={{ color: "#c7ecf4", backgroundColor: "#2682D7", maxWidth: "150px" }}
              placeholder='weight'
              value={newPetWeight}
              onChange={e => setNewPetWeight(Number(e.target.value))}
            />
            <Autocomplete
              placeholder="breed"
              startDecorator={<PiDog style={{ color: "#c7ecf4" }} />}
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4", maxWidth: "150px" }}
              options={petBreeds}
              value={newPetBreed}
              onChange={(e, value) => setNewPetBreed(value!)}
              getOptionLabel={option => option.name}
            />
            <Autocomplete
              placeholder="Size"
              size='sm'
              startDecorator={<LiaDogSolid style={{ color: "#c7ecf4" }} />}
              style={{ color: "#c7ecf4", backgroundColor: "#2682D7", maxWidth: "150px" }}
              options={sizes}
              value={newPetSize}
              onChange={(e, value) => setNewPetSize(value!)}
              getOptionLabel={option => option}
            />
            <p>{errorPetEdit}</p>
            <Button
              variant="outlined"
              color="primary"
              size="sm"
              onClick={saveEdit} 
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4", maxWidth: "150px" }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="sm"
              onClick={saveEdit} 
              style={{ background: "rgba(241, 241, 241, 0)", border: "1px solid #c7ecf4", maxWidth: "150px" }}
            >
              Excluir
            </Button>
          </CardContent>
        </Card>
      }
    </div>
  )
}

export default DogCard
