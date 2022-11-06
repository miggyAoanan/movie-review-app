import React, { MouseEventHandler, ReactNode } from 'react'

import Modal from './Modal';


import {  Header, Message, CloseSign } from './ModalPopup.styled'

export interface BaseActorModalWrapperProps {
    isModalVisible?: boolean;
    isDeleteModalVisible?:boolean;
    isEditModalVisible?: boolean;
    onBackdropClick: () => void;
    header?: string;
    message?: string;
    content?: ReactNode;
    forUpdateId?: string;
    deleteId?: string;
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
  
type Props =  BaseActorModalWrapperProps & ComponentsProps;

const BaseActorModalWrapper: React.FC<Props> = ({forUpdateId,deleteId, content, isModalVisible,isDeleteModalVisible,isEditModalVisible, onBackdropClick, header, message, ContainerComponent, CloseButtonComponent }) => {
    if (isModalVisible ||isDeleteModalVisible || isEditModalVisible) {
        return (<Modal onBackdropClick={onBackdropClick}>
            <ContainerComponent>
                <CloseButtonComponent onClick={onBackdropClick}>
                    <CloseSign />
                </CloseButtonComponent>
                <Header>{header}</Header>
                {message && <Message> {message}</Message>}
                {content}
               
            </ContainerComponent>
    
        </Modal>)
    }
  
    else{
        return null
    }
}

export default BaseActorModalWrapper