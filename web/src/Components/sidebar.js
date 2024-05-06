import { Stack, useTheme } from "@mui/material";
import { sideBarOptions } from "../utils/constants";

const SideBar = ({ selectedOption, setSelectedOption }) => {
    const Theme = useTheme()
    return (
        <Stack
            direction='row'
            sx={{
                overflowY: 'auto',
                height: '100%', // Ensure sidebar takes full height
                flexDirection: { xs: 'row', md: 'column' },
                gap: 1, // Add some spacing between buttons
                paddingY: 2, // Add vertical padding to buttons
            }}
        >
            {sideBarOptions.map((option) => (
                <button
                    key={option.name}
                    onClick={() => setSelectedOption(option.name)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px', // Adjust button padding
                        backgroundColor: option.name === selectedOption ? Theme.palette.primary.main : 'transparent',
                        color: option.name === selectedOption ? Theme.palette.text.primary : Theme.palette.primary.main,
                        borderRadius: '999px', // Make button round
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    <span 
                    style={{ marginRight: 8,
                        opacity: selectedOption === option.name ? 1 : 0.6
                     }}
                    >
                        {option.icon}</span>
                    <span>{option.name}</span>
                </button>
            ))}
        </Stack>
    );
};

export default SideBar;
