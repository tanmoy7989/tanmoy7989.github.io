ENVNAME=webenv

# get miniconda if not already present
if [ -z $(which conda) ]; then
    echo "Downloading and installing miniconda..."
    mkdir -p $HOME/mysoftware
    MINICONDA_SRC_PATH=$HOME/mysoftware/Miniconda3-latest-MacOSX-x86_64.sh
    MINICONDA_INSTALL_PATH=$HOME/miniconda3
    curl -o $MINICONDA_SRC_PATH https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
    bash $MINICONDA_SRC_PATH -b -p $MINICONDA_INSTALL_PATH
    echo -e "#conda\nsource $MINICONDA_INSTALL_PATH/etc/profile.d/conda.sh" >> $HOME/.bashrc
    echo "conda activate" >> $HOME/.bashrc
    source $HOME/.bashrc
else
    source $(conda info --base)/etc/profile.d/conda.sh
    conda activate
fi

# create conda environment if not already present and get ruby and jekyll
if [ ! -d $(conda info --base)/envs/$ENVNAME ]; then
    echo "Setting up personal website development conda env..."
    conda env create --file environment.yml
    conda activate $ENVNAME
    gem install jekyll bundler
fi

# activate conda env
conda activate $ENVNAME

# fetch gems
bundle install

# install gulp
# this is needed to build resume pdfs
cd resume && yarn add gulp




