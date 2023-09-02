import React from "react";
import Styles from "./Crane.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Crane = () => {
  return (
    <div className={`${Styles.main}`}>
      <section className={`${Styles.city_stuff}`}>
      <div className={`${Styles.landing} d-flex flex-column  align-items-center`}>
      <h1 className={`${Styles.advice__title}`}>SDCS Cranes</h1>
      <Button className={`rounded-5 ${Styles.button}`}>
          <Link to="/login" className="m-3 text-decoration-none text-light">
            Employee Login
          </Link>
        </Button>
        </div>
        <ul className={`${Styles.skyscrappers__list}`}>
          <li
            className={`${Styles.skyscrapper__item} ${Styles.skyscrapper_1}`}
          ></li>
          <li
            className={`${Styles.skyscrapper__item} ${Styles.skyscrapper_2}`}
          ></li>
          <li
            className={`${Styles.skyscrapper__item} ${Styles.skyscrapper_3}`}
          ></li>
          <li
            className={`${Styles.skyscrapper__item} ${Styles.skyscrapper_4}`}
          ></li>
          <li
            className={`${Styles.skyscrapper__item} ${Styles.skyscrapper_5}`}
          ></li>
        </ul>
        <ul className={`${Styles.tree__container}`}>
          <li className={`${Styles.tree__list}`}>
            <ul className={`${Styles.tree__item} ${Styles.tree_1}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
            <ul className={`${Styles.tree__item} ${Styles.tree_2}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
            <ul className={`${Styles.tree__item} ${Styles.tree_3}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
            <ul className={`${Styles.tree__item} ${Styles.tree_4}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
            <ul className={`${Styles.tree__item} ${Styles.tree_5}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
            <ul className={`${Styles.tree__item} ${Styles.tree_6}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
            <ul className={`${Styles.tree__item} ${Styles.tree_7}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
            <ul className={`${Styles.tree__item} ${Styles.tree_8}`}>
              <li className={`${Styles.tree__trunk}`}></li>
              <li className={`${Styles.tree__leaves}`}></li>
            </ul>
          </li>
        </ul>
        <ul className={`${Styles.crane__list} ${Styles.crane_1}`}>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_1}`}
          ></li>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_2}`}
          ></li>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_3}`}
          ></li>
          <li className={`${Styles.crane__item} ${Styles.crane_stand}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_weight}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_cabin}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_arm}`}></li>
        </ul>
        <ul className={`${Styles.crane__list} ${Styles.crane_2}`}>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_1}`}
          ></li>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_2}`}
          ></li>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_3}`}
          ></li>
          <li className={`${Styles.crane__item} ${Styles.crane_stand}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_weight}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_cabin}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_arm}`}></li>
        </ul>
        <ul className={`${Styles.crane__list} ${Styles.crane_3}`}>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_1}`}
          ></li>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_2}`}
          ></li>
          <li
            className={`${Styles.crane__item} ${Styles.crane_cable} ${Styles.crane_cable_3}`}
          ></li>
          <li className={`${Styles.crane__item} ${Styles.crane_stand}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_weight}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_cabin}`}></li>
          <li className={`${Styles.crane__item} ${Styles.crane_arm}`}></li>
        </ul>
      </section>
    </div>
  );
};

export default Crane;
