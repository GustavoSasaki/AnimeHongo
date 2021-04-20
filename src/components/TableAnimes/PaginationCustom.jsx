/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
// THIS IS THE CODE IN https://github.com/mbrn/material-table/blob/master/src/components/m-table-pagination.js
// Since MTablePaginationInner was not exported, I need to copy it all up, yep, really ugly

/* eslint-disable no-unused-vars */
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';
/* eslint-enable no-unused-vars */


const PaginationStyled = styled.div`
  background-color : ${({ theme }) => theme.TableHeaderBKColor};

  & *{
    color: ${({ theme }) => theme.lettersColor};
  }
`;

class MTablePaginationInner extends React.Component {
  scrollTableStart() {
    const elmnt = document.getElementById('MaterialTable');
    elmnt.scrollIntoView();
  }

  handleFirstPageButtonClick = (event) =>{
    this.props.onChangePage(event, 0);
    this.scrollTableStart();
  }

  handleBackButtonClick = (event) =>{
    this.props.onChangePage(event, this.props.page - 1);
    this.scrollTableStart();
  }

  handleNextButtonClick= (event) =>{
    this.props.onChangePage(event, this.props.page + 1);
    this.scrollTableStart();
  }

  handleLastPageButtonClick = (event) =>{
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
    this.scrollTableStart();
  }

  render() {
    const {
      classes,
      count,
      page,
      rowsPerPage,
      theme,
      showFirstLastPageButtons,
    } = this.props;
    const localization = {
      ...MTablePaginationInner.defaultProps.localization,
      ...this.props.localization,
    };

    return (
      <PaginationStyled className={classes.root}>
        {showFirstLastPageButtons && (
          <Tooltip title={localization.firstTooltip}>
            <span>
              <IconButton
                onClick={this.handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label={localization.firstAriaLabel}
              >
                {theme.direction === 'rtl' ? (
                  <this.props.icons.LastPage />
                ) : (
                  <this.props.icons.FirstPage />
                )}
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Tooltip title={localization.previousTooltip}>
          <span>
            <IconButton
              onClick={this.handleBackButtonClick}
              disabled={page === 0}
              aria-label={localization.previousAriaLabel}
            >
              {theme.direction === 'rtl' ? (
                <this.props.icons.NextPage />
              ) : (
                <this.props.icons.PreviousPage />
              )}
            </IconButton>
          </span>
        </Tooltip>
        <Typography
          variant="caption"
          style={{
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            flexBasis: 'inherit',
          }}
        >
          {localization.labelDisplayedRows
            .replace(
              '{from}',
              this.props.count === 0
                ? 0
                : this.props.page * this.props.rowsPerPage + 1,
            )
            .replace(
              '{to}',
              Math.min(
                (this.props.page + 1) * this.props.rowsPerPage,
                this.props.count,
              ),
            )
            .replace('{count}', this.props.count)}
        </Typography>
        <Tooltip title={localization.nextTooltip}>
          <span>
            <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label={localization.nextAriaLabel}
            >
              {theme.direction === 'rtl' ? (
                <this.props.icons.PreviousPage />
              ) : (
                <this.props.icons.NextPage />
              )}
            </IconButton>
          </span>
        </Tooltip>
        {showFirstLastPageButtons && (
          <Tooltip title={localization.lastTooltip}>
            <span>
              <IconButton
                onClick={this.handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label={localization.lastAriaLabel}
              >
                {theme.direction === 'rtl' ? (
                  <this.props.icons.FirstPage />
                ) : (
                  <this.props.icons.LastPage />
                )}
              </IconButton>
            </span>
          </Tooltip>
        )}
      </PaginationStyled>
    );
  }
}

const actionsStyles = (theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    display: 'flex',
    // lineHeight: '48px'
  },
});

MTablePaginationInner.propTypes = {
  onChangePage: PropTypes.func,
  page: PropTypes.number,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
  classes: PropTypes.object,
  localization: PropTypes.object,
  theme: PropTypes.any,
  showFirstLastPageButtons: PropTypes.bool,
};

MTablePaginationInner.defaultProps = {
  showFirstLastPageButtons: true,
  localization: {
    firstTooltip: 'First Page',
    previousTooltip: 'Previous Page',
    nextTooltip: 'Next Page',
    lastTooltip: 'Last Page',
    labelDisplayedRows: '{from}-{to} of {count}',
    labelRowsPerPage: 'Rows per page:',
  },
};

const TablePaginationCustom = withStyles(actionsStyles, { withTheme: true })(
  MTablePaginationInner,
);

export default TablePaginationCustom;
