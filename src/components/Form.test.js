import React from 'react';
//import axios from 'axios';
import { render, screen } from '@testing-library/react';

import Form from './Form';

describe('Form', () => {
    //jest.mock('axios')
    test('API test', async () => {
        /*axios.get.mockImplementation(url => {
            if (url === 'https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d') {
                return Promise.resolve({ data: { page: '1' } });
            }
        })*/
        
        render(<Form />);
        const text = await screen.findByText('Bas');
        expect(text).toBeInTheDocument;
    });
});