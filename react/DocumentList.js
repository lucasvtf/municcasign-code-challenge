import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const userId = 1;
        const response = await axios.get(`http://localhost:3001/docs/${userId}`);
        setDocuments(response.data);
      } catch (err) {
        setError('Erro ao buscar documentos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) return <p>Carregando documentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Documentos</h1>
      {documents.length === 0 ? (
        <p>Nenhum documento encontrado.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <strong>Documento ID:</strong> {doc.id} <br />
              <strong>Título:</strong> {doc.title} <br />
              <strong>Conteúdo:</strong> {doc.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
