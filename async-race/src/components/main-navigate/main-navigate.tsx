import React, { useEffect, useState } from "react";

type MainNavigateProps = {
  activePage: string;
  onNavigate: (pageName: string) => void;
}

export default function MainNavigate({activePage, onNavigate}: MainNavigateProps ) {
  return (
    <div className="main-navigate">
      <button className="main-navigate__button main-navigate__button--garage"
        onClick={() => {
          onNavigate('garage');
        }}>To garage</button>
      <button className="main-navigate__button main-navigate__button--winners"
        onClick={() => {
          onNavigate('winners');
        }}>To winners</button>
    </div>
  )
}