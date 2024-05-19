//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                                                                              //
//               Find all icons here:                                           //
//                                                                              //
//               https://mui.com/material-ui/material-icons/                    //
//                                                                              //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNew from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import LaunchIcon from '@mui/icons-material/Launch';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Cancel from '@mui/icons-material/Cancel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type IconSizeType = 'small' | 'medium' | 'large' | 'inherit';
export interface IconProps {
  icon: IconType;
  size?: IconSizeType;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}
export function Icon({ icon, size = 'medium', color = 'white', onClick, disabled }: IconProps) {
  const iconComponents: Record<IconType, JSX.Element> = {
    MenuIcon: <MenuIcon sx={{ color }} fontSize={size} />,
    DeleteIcon: <DeleteIcon sx={{ color }} fontSize={size} />,
    PlaylistRemoveIcon: <PlaylistRemoveIcon sx={{ color }} fontSize={size} />,
    SaveAlt: <SaveAltIcon sx={{ color }} fontSize={size} />,
    WarningAmber: <WarningAmberIcon sx={{ color }} fontSize={size} />,
    Edit: <EditIcon sx={{ color }} fontSize={size} />,
    Save: <SaveIcon sx={{ color }} fontSize={size} />,
    RadioButtonChecked: <RadioButtonChecked sx={{ color }} fontSize={size} />,
    RadioButtonUnchecked: <RadioButtonUnchecked sx={{ color }} fontSize={size} />,
    OpenInNew: <OpenInNew sx={{ color }} fontSize={size} />,
    Cancel: <Cancel sx={{ color }} fontSize={size} />,
    AccountCircle: <AccountCircle sx={{ color }} fontSize={size} />,
    ListAltIcon: <ListAltIcon sx={{ color }} fontSize={size} />,
    DragIndicatorIcon: <DragIndicatorIcon sx={{ color }} fontSize={size} />,
    LaunchIcon: <LaunchIcon sx={{ color }} fontSize={size} />,
    MenuOpenIcon: <MenuOpenIcon sx={{ color }} fontSize={size} />,
    CheckBoxOutlineBlankIcon: <CheckBoxOutlineBlankIcon sx={{ color }} fontSize={size} />,
    CheckBoxIcon: <CheckBoxIcon sx={{ color }} fontSize={size} />,
    InfoIcon: <InfoIcon sx={{ color }} fontSize={size} />,
    LocalDiningIcon: <LocalDiningIcon sx={{ color }} fontSize={size} />,
    SearchIcon: <SearchIcon sx={{ color }} fontSize={size} />,
    Close: <CloseIcon sx={{ color }} fontSize={size} />,
    HelpIcon: <HelpIcon sx={{ color }} fontSize={size} />,
    ExpandMoreIcon: <ExpandMoreIcon sx={{ color }} fontSize={size} />,
    ExpandLessIcon: <ExpandLessIcon sx={{ color }} fontSize={size} />,
    PostAddIcon: <PostAddIcon sx={{ color }} fontSize={size} />,

  };

  const selectedIcon = iconComponents[icon];

  if (onClick === undefined) return React.cloneElement(selectedIcon, { fontSize: size });
  return (
    <button disabled={disabled} onClick={onClick} className=' transition hover-duration-150 ease-in-out hover:scale-125 active:scale-90'>
      {React.cloneElement(selectedIcon, { fontSize: size })}
    </button>
  )
}

export type IconType = typeof iconRegistry[number];
export const iconRegistry = [
  'HelpIcon',
  'SaveAlt',
  'Close',
  "PostAddIcon",
  'Edit',
  'WarningAmber',
  'Save',
  'RadioButtonChecked',
  'RadioButtonUnchecked',
  'Cancel',
  "MenuOpenIcon",
  'OpenInNew',
  'AccountCircle',
  'ListAltIcon',
  "DragIndicatorIcon",
  "LaunchIcon",
  "DeleteIcon",
  "CheckBoxOutlineBlankIcon",
  "CheckBoxIcon",
  "InfoIcon",
  "SearchIcon",
  "LocalDiningIcon",
  "MenuIcon",
  'ExpandLessIcon',
  'ExpandMoreIcon',
  'PlaylistRemoveIcon',
] as const;
