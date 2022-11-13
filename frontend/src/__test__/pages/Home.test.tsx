import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import {Home} from '../../pages/home/Home' 
import configureStore from "redux-mock-store";
import { createMemoryHistory } from "history";