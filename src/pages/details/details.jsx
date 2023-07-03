/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DetailsBanner from './detailsBanner/detailsBanner.jsx'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/Usefetch.jsx';
import Cast from '../../components/cast/cast.jsx';
import VideosSection from '../../components/videosSection/videosSection.jsx';
import Similar from '../../components/carousels-ll/Similar.jsx';
import Recommendation from '../../components/carousels-ll/Recomendation.jsx';
const details = () => {

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);


  // const matchingTrailers = data?.results?.filter(
  //   result => result.name === 'Official Trailer' || result.name === 'Final Trailer' || result.name === 'Trailer' || result.name === 'Official Trailer 2'
  // );
  const matchingTrailers = data?.results?.filter(result =>
    result.name.includes("Trailer")
  );


  console.log("Dates returning from matching trailer : ", matchingTrailers);



  return (
    <div>
      {data?.results && (
        <DetailsBanner video={matchingTrailers} crew={credits?.crew} />
      )}
      {credits && (
        <Cast data={credits?.cast} loading={creditsLoading} />
      )}
      <VideosSection data={data} loading={loading} />

      <Recommendation mediaType={mediaType} id={id} />
      <Similar mediaType={mediaType} id={id} />


    </div>
  );

}

export default details