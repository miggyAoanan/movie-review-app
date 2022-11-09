
import React, { MouseEventHandler, ReactNode } from 'react'
import Modal from './Modal';
import {  Header, Message, CloseSign } from './ModalPopup.styled'

export interface BaseModalWrapperProps {
    isModalVisible?: boolean;
    isEditModalVisible?:boolean;
    isDeleteModalVisible?:boolean;
    onBackdropClick: () => void;
    header?: string;
    message?: string;
    content?: ReactNode;
    forUpdateId?: string;
    forDeleteId?: string;
    deleteMovieId?:string;
}

interface ComponentsProps {
    ContainerComponent: React.ComponentType<{
        children?:ReactNode
    }>;
    CloseButtonComponent: React.ComponentType<{
      onClick?: MouseEventHandler<any>;
      children?:ReactNode
    }>;
  }
  
type Props =  BaseModalWrapperProps & ComponentsProps;

const BaseModalWrapper: React.FC<Props> = ({forUpdateId,forDeleteId,deleteMovieId,isDeleteModalVisible, content,isEditModalVisible, isModalVisible, onBackdropClick, header, message, ContainerComponent, CloseButtonComponent }) => {
    if ((isModalVisible)  ||  (isEditModalVisible || isDeleteModalVisible) || forUpdateId  || forDeleteId) {
        return (<Modal onBackdropClick={onBackdropClick}>
            <ContainerComponent>
                <CloseButtonComponent onClick={onBackdropClick}>
                    <CloseSign />
                </CloseButtonComponent>
                <Header>{header}</Header>
                {message && <Message> {message}</Message>}
                {content}
               
            </ContainerComponent>
    
        </Modal>);
    }else{
        return null
    }

   
  
   
}

export default BaseModalWrapper