import React from 'react'

import { ToolbarContainer } from './styles'

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = ({ children }) => <ToolbarContainer>{children}</ToolbarContainer>

export default Toolbar
