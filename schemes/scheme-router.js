const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "could not retrieve schemes" })
    })
})


router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme.length === 0) {
        res.status(404).json(null)
      } else if (scheme) {
        res.status(200).json(scheme)
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps);
      } else {
        res.status(404).json({ message: 'Could not find steps for given scheme' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps' });
    });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
    .then(scheme => {
      if (scheme) {
        console.log(scheme)
        // res.status(201).json(scheme);
        Schemes.findById(scheme[0])
          .then(scheme => {
            res.status(201).json(scheme);
          })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new scheme' });
    });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.addStep(stepData, id)
          .then(step => {
            res.status(201).json(step);
          })
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new step' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.update(changes, id)
          .then(() => {
            Schemes.findById(id)
              .then(scheme => {
                res.status(201).json(scheme);
              })
          });
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update scheme' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      Schemes.remove(id)
        .then(deleted => {
          deleted === 0
            ? res.status(404).json(null)
            : res.status(200).json(scheme)
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to delete scheme' });
        });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "server error" })
    })
});


module.exports = router;