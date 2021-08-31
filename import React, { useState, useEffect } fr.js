import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import { Loader } from "./Loader";

export const User = () => {
  const [card, setCard] = useState([]);
  let [visible, setVisible] = useState(2);
  const [loading, setLoading] = useState(false);
  const allDataJson = async () => {
    const response = await axios.get("https://reqres.in/api/users?page=1");
    setTimeout(() => {
      setLoading(true);
    }, 500);
    setCard(response.data.data);
  };

  const loadMore = async () => {
    if (visible < 6) {
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
      }, 700);
      setVisible(visible + 2);
    } else {
      visible = 0;
      const response2 = await axios.get("https://reqres.in/api/users?page=2");
      setCard([]);
      setCard(response2.data.data);
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
      }, 700);
      setVisible(visible + 2);
    }
  };

  useEffect(() => {
    allDataJson();
  }, []);

  const renderCard = (user) => {
    return (
      <Card key={user.id} style={{ width: "80%" }}>
        <Card.Img variant="top" src={user.avatar} />
        <Card.Body>
          <Card.Title>
            {user.first_name} {user.last_name}
          </Card.Title>
          <Card.Text style={{ fontSize: 13 }}>{user.email}</Card.Text>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div className="userData">
      {loading ? (
        <>
          <h2>Welcome Admin</h2>
          {visible > 0 && (
            <button className="btn btn-info loadMoreBtn" onClick={loadMore}>
              Load More
            </button>
          )}
          <div className="wrapper">
            <div className="cards">
              {card.slice(0, visible).map(renderCard)}
            </div>
          </div>
        </>
      ) : (
        <Loader/>
      )}
    </div>
  );
};