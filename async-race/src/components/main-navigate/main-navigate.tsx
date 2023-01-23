import React from "react";
import '../../style.css';
import './main-navigate.css';

type MainNavigateProps = {
  activePage: string;
  onNavigate: (pageName: string) => void;
}

export default function MainNavigate({activePage, onNavigate}: MainNavigateProps ) {
  return (
    <div className="main-navigate">
      <button className="btn main-navigate__button main-navigate__button--garage"
        onClick={() => {
          onNavigate('garage');
        }}>To garage</button>
      <button className="btn main-navigate__button main-navigate__button--winners"
        onClick={() => {
          onNavigate('winners');
        }}>To winners</button>
    </div>
  )
}