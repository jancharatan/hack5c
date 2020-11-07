import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getBaseUrl, getFrontendBaseUrl } from '../../environment';

const LinkControls = () => {
  const [disabled, setDisabled] = useState(false);
  const [link, setLink] = useState(undefined);

  const getVisLink = () => {
    setDisabled(true);
    fetch(`${getBaseUrl()}/get-vis-link`, {
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'POST',
      body: JSON.stringify({
        settings: { test: 'a' },
      }),
    })
      .then((a) => a.json())
      .then((json) => {
        setLink(json.link_id);
      });
  };

  let content = (
    <Button onClick={getVisLink} disabled={disabled}>
      Get Visualization Link
    </Button>
  );
  if (link) {
    const url = `${getFrontendBaseUrl()}/${link}`;
    content = (
      <div>
        <div>Your visualization link:</div>
        <a href={url}>{url}</a>
      </div>
    );
  }

  return (
    <div className="w-100 rounded border p-3 mt-3" style={{ backgroundColor: 'white' }}>
      <h1>Share this visualization!</h1>
      <div className="d-flex flex-row">{content}</div>
    </div>
  );
};

export default LinkControls;