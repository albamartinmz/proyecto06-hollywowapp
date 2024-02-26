import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePoster, deletePoster } from '../services/posterServices';
import ButtonEdit from '../components/ButtonEdit';
import styled from 'styled-components';

const ButtonDelete = styled.button`
    background-color: #9C325C;
    border-color: #CEA436;
    border-radius: 6px;
    color:#CEA436;
    width: 91px;
    height: 28px;
    margin-top: 5%;
    margin-bottom: 2%;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: bold;
    cursor: pointer;
    `;

const CardDetail = () => {
    const { id } = useParams();
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        const fetchPosterById = async () => {
        try {
            const response = await getOnePoster(id);
            setPoster(response);
        } catch (error) {
            console.error('Error fetching poster by ID:', error);
        }};

        fetchPosterById();
    }, [id]);

    const clickDelete = async () => {
        try {
            const result = await deletePoster(id);
            console.log('Poster eliminado:', result);
        } catch (error) {
            console.error('Error al eliminar el póster:', error);
        }
    };    

    return (
        <>
        {poster && (
            <div className="card-detail">
                <img className="card-detail__imageUrl" src={poster.imageUrl}/>
                <h2 className="card-detail__name">{poster.name}</h2>
                <p className="card-detail__director">Director: {poster.director}</p>
                <p className="card-detail__year">Year: {poster.year}</p>
                <ButtonDelete onClick={() => clickDelete(poster.id)} className="button-delete">ELIMINAR</ButtonDelete>
                <ButtonEdit id={poster.id}/>
            </div>
        )}
        </>
    );
};

export default CardDetail;