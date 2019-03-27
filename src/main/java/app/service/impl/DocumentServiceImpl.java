package app.service.impl;

import app.service.DocumentService;
import app.domain.Document;
import app.repository.DocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Document.
 */
@Service
@Transactional
public class DocumentServiceImpl implements DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentServiceImpl.class);

    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    /**
     * Save a document.
     *
     * @param document the entity to save
     * @return the persisted entity
     */
    @Override
    public Document save(Document document) {
        log.debug("Request to save Document : {}", document);
        return documentRepository.save(document);
    }

    /**
     * Get all the documents.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Document> findAll() {
        log.debug("Request to get all Documents");
        return documentRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Document with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Document> findAllWithEagerRelationships(Pageable pageable) {
        return documentRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one document by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Document> findOne(Long id) {
        log.debug("Request to get Document : {}", id);
        return documentRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the document by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Document : {}", id);
        documentRepository.deleteById(id);
    }
}
