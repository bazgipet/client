import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../design/MyRecipes.css'
import NavbarProtected from "../components/NavbarProtected";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import SmoothieTile from "../components/SmoothieTile";
import AuthContext from '../utils/AuthContext';

function MyRecipes() {
    const [isOpen, setIsOpen] = useState(false)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [prepare_time, setPrepareTime] = useState('');
    const [work, setWork] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [total_amount, setTotalAmount] = useState('');
    const [file, setFile] = useState(null);

    

    function openCreateModal() {
        if (!isOpen) {
            setIsOpen(true)
        }
    }

    const modalStyles = {
        transform: isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
        // add more styles here based on isOpen state
    }

    const handleCreateRecipe = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('prepare_time', prepare_time);
            formData.append('work', work);
            formData.append('ingredients', ingredients);
            formData.append('total_amount', total_amount);
            formData.append('file', file);
            let token = localStorage.getItem("token")
            token = token ? JSON.parse(token) : null;
            if (!token){
                throw new Error('Token must be provided - react/MyRecipe.js')
            }

            console.log(formData)

            const response = await fetch('/api/register-recipe', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>
            <aside className="create_recipe">
                <article className="create_recipe_form" style={modalStyles}>
                    <FontAwesomeIcon icon={faXmark} onClick={() => { setIsOpen(false) }} />
                    <h2>New recipe</h2>
                    <label>Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                    <label>Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                    <label>Preparation time</label>
                    <input type="text" onChange={(e) => setPrepareTime(e.target.value)} />
                    <label>Steps (divide with ;)</label>
                    <input type="text" onChange={(e) => setWork(e.target.value)} />
                    <label>Ingredients (divide with ;)</label>
                    <input type="text" onChange={(e) => setIngredients(e.target.value)} />
                    <label>Total serving</label>
                    <input type="number" onChange={(e) => setTotalAmount(e.target.value)}></input>
                    <label>Image</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button onClick={handleCreateRecipe}>Create</button>
                </article>
                {isOpen ? <div className="overlay"></div> : <></>}
            </aside>

            <section>
                <NavbarProtected />
                <section className="myrecipes_section">
                    <h1>My recipes</h1>
                    <p>Keep all your favorite smoothie recipes in one place.
                        Easily access and manage your creations, and never lose a recipe again.
                        Start adding your delicious smoothie concoctions now!
                    </p>
                    <button onClick={openCreateModal}>
                        <FontAwesomeIcon icon={faPlus} />
                        Add recipe
                    </button>

                    <section className="all_my_recipes">
                        <ul className="smoothie_grid">
                            <SmoothieTile />
                            <SmoothieTile />
                            <SmoothieTile />
                            <SmoothieTile />
                            <SmoothieTile />
                            <SmoothieTile />
                            <SmoothieTile />
                        </ul>
                    </section>
                </section>
                <Footer />
            </section>
        </>
    )
}

export default MyRecipes