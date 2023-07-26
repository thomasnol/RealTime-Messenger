import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div.attrs({
    className: 'container',
})``

//const Nav = styled.nav.attrs({
//    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
//})`
//    margin-bottom: 20 px;
//`

class ChatArea extends Component {
    render() {
        return (
            <Container>
                <Nav />
            </Container>
        )
    }
}

export default ChatArea