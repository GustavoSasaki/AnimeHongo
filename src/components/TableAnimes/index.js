/* eslint-disable brace-style */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MaterialTable, {
  MTableBodyRow, 
} from '@material-table/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TablePaginationCustom from './TablePaginationCustom';
import TableToolBarCustom from './TableToolBarCustom';

import tableIcons from './icons';
import ColumnsInfo from './columnsInfo';
import db from '../../db/styleDb.json';
import { server } from '../../utils/siteUrl';

const tableTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '14px 8px',
        'border-bottom': 'none',
        '@media (max-width: 500px)': {
          padding: '14px 4px',
        },
      },
    },
    MuiTableSortLabel: {
      root: {
        color: db.theme.lettersColor,
        backgroundColor: db.theme.TableHeaderBKColor,
        position: 'relative',
        '&:focus': {
          color: db.theme.TableTitleFocus,
        },
        '&:hover': {
          color: db.theme.TableTitleFocus,
        },
        '&.MuiTableSortLabel-active': {
          color: db.theme.TableTitleFocus,
        },
      },
    },
    tableCell: {
      paddingRight: 4,
      paddingLeft: 5,
    },
  },
});

// every row from db has one animesInfo
function TableAnimes({ animeRows, AouthInfo, getAnimeRows }) {
  const [tableData, setTableData] = useState(animeRows);

  function UpdateRating({
    animeIndex, scoreTotalNew, numberScoresNew, ratingNew,
  }) {
    const newTableData = [...tableData];
    newTableData[animeIndex] = {
      ...tableData[animeIndex],
      hongoScore: scoreTotalNew,
      numberHongoScore: numberScoresNew,
      userRating: ratingNew,
    };
    setTableData(newTableData);
  }

  function CalculateTotalScore({ animeIndex, ratingNew }) {
    const scoreTotalOld = tableData[animeIndex].hongoScore;
    const numberScoresOld = tableData[animeIndex].numberHongoScore;
    const ratingOld = tableData[animeIndex].userRating;

    let scoreTotalNew;
    let numberScoresNew;
    const total = scoreTotalOld * numberScoresOld;

    // if removing rating
    if (ratingNew === undefined) {
      numberScoresNew = numberScoresOld - 1;
      if (numberScoresNew === 0) {
        scoreTotalNew = 0;
      } else {
        scoreTotalNew = (total - ratingOld) / numberScoresNew;
      }
    }
    // first review for this user of the anime
    else if (typeof ratingOld === 'undefined') {
      numberScoresNew = numberScoresOld + 1;
      scoreTotalNew = (total + ratingNew) / numberScoresNew;
    }
    // changing alread reviewed anime
    else {
      numberScoresNew = numberScoresOld;
      scoreTotalNew = (total - ratingOld + ratingNew) / numberScoresNew;
    }

    return { scoreTotalNew, numberScoresNew };
  }

  async function UserPostScore({ ratingNew, uidAnime }) {
    if (AouthInfo === undefined) {
      return;
    }
    const animeIndex = tableData.findIndex((obj) => obj.uid === uidAnime);
    const { scoreTotalNew, numberScoresNew } = CalculateTotalScore({ ratingNew, animeIndex });
    UpdateRating({
      animeIndex, scoreTotalNew, numberScoresNew, ratingNew,
    });

    if (ratingNew === undefined) {
      await fetch(`${server}/api/removeScore`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          AouthInfo, siteAccount: 'google', uidAnime,
        }),
      });
    } else {
      await fetch(`${server}/api/postScore`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          AouthInfo, siteAccount: 'google', uidAnime, ratingNew,
        }),
      });
    }
  }

  useEffect(async () => {
    // load everything again
    if (AouthInfo !== 'undefined') {
      setTableData(await getAnimeRows({ AouthInfo }));
    }
  }, [AouthInfo]);

  return (
    <TableStyled id="MaterialTable">
      <MuiThemeProvider theme={tableTheme}>

        <MaterialTable
          icons={tableIcons}
          columns={ColumnsInfo({ UserPostScore, AouthInfo })}
          data={tableData}
          components={{
            Row: (props) => (<TableRowStyled {...props} />),
            Toolbar: (props) => (
              <ToolBarStyled>
                <TableToolBarCustom {...props} />
              </ToolBarStyled>
            ),
            Pagination: (props) => (
              <PaginationStyled>
                <TablePaginationCustom {...props} />
              </PaginationStyled>
            ),
          }}
          options={{
            pageSize: 10,
            draggable: false,
            showTitle: false,
            emptyRowsWhenPaging: false,
            headerStyle: {
              color: db.theme.lettersColor,
              backgroundColor: db.theme.TableHeaderBKColor,
            },
            searchFieldStyle: {
              color: db.theme.lettersColor,
            },
            rowStyle: {
              color: db.theme.lettersColor,
            },
          }}
        />
      </MuiThemeProvider>
    </TableStyled>
  );
}

TableAnimes.propTypes = {

  animeRows: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    link: PropTypes.string,
    malRating: PropTypes.number,
    hongoScore: PropTypes.number,
    numberHongoScore: PropTypes.number,
    imgUrl: PropTypes.string,
    uid: PropTypes.number,
  })).isRequired,
  getAnimeRows: PropTypes.func.isRequired,
};

const TableStyled = styled.div`

  width:100%;
  display: flex;
  justify-content: center;

  & > *{
    border: ${({ theme }) => `solid ${theme.menuBorderColor}`};
    width:90%;
    @media(max-width: 800px) {
      width: 100%;
    }
  }
  & > * *{
    border: none;
  }
`;

const TableRowStyled = styled(MTableBodyRow)`

  :nth-child(odd){
    background-color : ${({ theme }) => theme.TableRowOddBKColor};
  }
  :nth-child(even){
    background-color : ${({ theme }) => theme.TableRowEvenBKColor};
  }
`;

const ToolBarStyled = styled.div`
  background-color : ${({ theme }) => theme.TableHeaderBKColor};
  border-bottom-style: solid;
  border-color: ${({ theme }) => theme.menuBorderColor};
  & *{
    color: ${({ theme }) => theme.lettersColor};
  }

`;

const PaginationStyled = styled.div`
  background-color : ${({ theme }) => theme.TableHeaderBKColor};

  & *{
    color: ${({ theme }) => theme.lettersColor};
  }
`;

export default TableAnimes;
